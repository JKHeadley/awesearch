import os
import shutil
import fnmatch
from pathlib import Path

def parse_gitignore(gitignore_path):
    ignore_patterns = []
    if gitignore_path.exists():
        with open(gitignore_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    # Normalize pattern to use '/' as directory separator
                    pattern = line.replace('\\', '/')
                    # Ensure patterns ending with '/' match all files inside that directory
                    if pattern.endswith('/'):
                        pattern += '**'
                    ignore_patterns.append(pattern)
    return ignore_patterns

def should_ignore(path, root, ignore_patterns):
    # Convert path to a relative path string for matching
    rel_path = os.path.relpath(path, root).replace('\\', '/')
    
    # Special case for node_modules
    if "node_modules" in rel_path.split(os.sep):
        return True
    if ".git" in rel_path.split(os.sep):
        return True
    if ".vscode" in rel_path.split(os.sep):
        return True
    if ".idea" in rel_path.split(os.sep):
        return True
    if "pnpm-lock.yaml" in rel_path.split(os.sep):
        return True
    
    # Check if any parent directory of the path should be ignored
    path_parts = rel_path.split('/')
    for i in range(len(path_parts)):
        partial_path = '/'.join(path_parts[:i+1])
        if any(fnmatch.fnmatch(partial_path, pattern) for pattern in ignore_patterns):
            return True
    
    # Check the full path against ignore patterns
    return any(fnmatch.fnmatch(rel_path, pattern) for pattern in ignore_patterns)

def copy_git_project():
    # Get the current directory (assumed to be the git project root)
    root_dir = Path.cwd()
    
    # Create the project_copy directory if it doesn't exist
    copy_dir = root_dir / 'project_copy'
    copy_dir.mkdir(exist_ok=True)
    
    # Parse .gitignore file
    gitignore_path = root_dir / '.gitignore'
    ignore_patterns = parse_gitignore(gitignore_path)
    
    # Walk through the directory
    for dirpath, dirnames, filenames in os.walk(root_dir, topdown=True):
        # Skip the project_copy directory itself
        if Path(dirpath) == copy_dir:
            dirnames[:] = []  # Don't recurse into project_copy
            continue
        
        # Check if the current directory should be ignored
        if should_ignore(dirpath, root_dir, ignore_patterns):
            print(f"Ignoring directory: {os.path.relpath(dirpath, root_dir)}")
            dirnames[:] = []  # Don't recurse into ignored directories
            continue
        
        # Process each file
        for filename in filenames:
            file_path = Path(dirpath) / filename
            
            # Skip files that match .gitignore patterns
            if should_ignore(file_path, root_dir, ignore_patterns):
                continue
            
            # Copy the file to project_copy
            dest_path = copy_dir / filename
            
            # If a file with the same name already exists, append a number
            counter = 1
            while dest_path.exists():
                name, ext = os.path.splitext(filename)
                dest_path = copy_dir / f"{name}_{counter}{ext}"
                counter += 1
            
            shutil.copy2(file_path, dest_path)
            print(f"Copied: {file_path.relative_to(root_dir)} -> {dest_path.name}")

if __name__ == "__main__":
    copy_git_project()