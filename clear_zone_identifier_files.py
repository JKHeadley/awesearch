import os

def delete_zone_identifier_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith("Zone.Identifier"):
                file_path = os.path.join(root, file)
                try:
                    os.remove(file_path)
                    print(f"Deleted: {file_path}")
                except Exception as e:
                    print(f"Error deleting {file_path}: {e}")

if __name__ == "__main__":
    current_directory = os.getcwd()
    delete_zone_identifier_files(current_directory)
