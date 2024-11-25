How to build powerful REST APIs blazingly fast with Node.js
Justin Headley
HackerNoon.com
Justin Headley

·
Follow

Published in
HackerNoon.com

·
6 min read
·
Jun 26, 2018
5.3K


10




Let’s face it, if you’re a web developer, you deal with APIs. Whether you write your own or use someone else’s, it’s just part of the job. REST APIs in particular are very common place. Unfortunately when it comes to the wild west world of Javascript and Node.js, standards and good practice in writing RESTful APIs can sometimes get thrown out the window.

Why?

Because its “easier”
Because “good enough” is sometimes all it takes
Because everyone’s “standard” might be different
…you name it

<image>
image of terrible api
<image_caption>
don’t be that developer…
</image_caption>
</image>
Are any of these good reasons to write weak code? Of course not, but they exist nonetheless. Its human nature. It’s all to easy to “take a shortcut”, and sometimes with tight deadlines it seems unavoidable. Trust me I’ve been there. So what can be done about it? Well the good news is there are better ways to develop when you’ve got the right toolset, and with enough luck you might even discover that the “right” way is the easy way. It took me a long time to find my own path of discovery. My hope is by sharing my story I might save you (and your API consumer) some heartache. Here’s what I’ve learned…

You can skip to The Result section if you want to get directly to business. Or visit https://github.com/JKHeadley/rest-hapi

<image>
image of "hold on to your butts" from jurassic park
<image_caption>
you’re in for a wild ride
</image_caption>
</image>
The Story
For the past several years I’ve been working as a web developer for the software consultancy Scal.io. During this time I’ve had the pleasure of learning Node.js and working on multiple apps all serving RESTful APIs. At first everything seemed great. I mean, just google any tutorial for building a RESTful API with Node.js. You’ll find tons of articles and videos on how to have your own server up and running in minutes.

Wow! This stuff is easy! (I thought) At least at first…

It wasn’t long before I started running into issues.

Oh, you want payload validation? What about query parameters? How can I document these endpoints? Do I really have to copy and paste these route handlers over and over? Wait, you want to use MongoDB, but still support relationships? 😳

Programming with Node.js is extremely flexible which means even a simple task can be solved many different ways. Unfortunately that means developers are free to overcomplicate things (which we tend to do). It’s no wonder then how API development can get out of hand when feature requests start piling up. This can quickly turn into an ugly mess, especially if you’re trying to coordinate with other developers.

<image>
image of "stop this madness" from game of thrones
<image_caption>
the king of sanity?
</image_caption>
</image>
After working on several projects together, a buddy of mine who’s an awesome developer came up with (and implemented) the great idea of generating RESTful endpoints based on our data models. I immediately loved it. Now we were spending more time focusing on the structure and business logic of the app rather than writing CRUD endpoints over and over. Not only that, but any time we needed new functionality (like filtering a GET request) we only had to write it once for all endpoints! It felt like a DRY API paradise 😆

I knew we were on to something…

The Journey
Soon after we completed that project I started looking into how we could take what we had created and make a useful tool out of it. The original solution worked well, but it was tightly coupled to the project and still lacked a good amount of functionality. I spent days brainstorming and re-writing code. After what seemed like a huge amount of effort, I finally had a workable solution. However (like most beginnings)…it was pretty embarrassing.

The tool worked, but it existed as a framework that you had to clone directly from GitHub (eww). The developer was forced to design their project around the framework and it still lacked a lot of functionality, even compared to our original solution.

<image>
meme image of "created a repot and made an initial commit, I guess you could say things are getting serious"
<image_caption>
I feels it tho!
</image_caption>
</image>

Luckily things were just getting started. I still had my own hopes and dreams for the project, and now that it was officially public it ever so slowly began to gain some interest. The magic of open source came to life as developers gave their feedback, submitted issues, and some even began to contribute!

Before long major improvements were made such as turning the project into an npm module and a hapi server plugin. I also had the amazing opportunity (thanks to Scal.io) to develop and use the tool within some real world projects.

I always believed in the core concept of the project but it was exciting to have its usefulness validated through my own experience.

<image>
gif of "I have the power" from he-man
<image_caption>
yessss
</image_caption>
</image>
The more it improved the more I felt we had really tapped into a goldmine for RESTful API development. The resulting code was consistent, robust, and easy to follow (standards…yay!). Not only that, but what previously took days or weeks to develop now could be done in just a few hours!

The Result
<image>
image of rest-hapi logo
<image_caption>
rest-hapi
</image_caption>
</image>
After nearly two years of hard work and development I’m excited to introduce rest-hapi v1 to the web development community. We’ve been able to pack a lot of useful features into the tool so far including:

Automatic generation of CRUD and association endpoints with middleware support
joi validation
Route-level and document-level authorization
Swagger docs for all generated endpoints
Query parameter support for searching, sorting, filtering, pagination, and embedding of associated models
Endpoint activity history through Audit Logs
Support for policies
Duplicate fields
Support for “soft” delete
Optional metadata for documents
Mongoose wrapper methods
…and more!
With just a few simple data models you can instantly generate hundreds of documented, robust endpoints. Check out these examples:

<image>
gif of rest-hapi in action
<image_caption>
generating endpoints locally
</image_caption>
</image>
querying the user collection and populating the user-role relationship
The goal from the start was to develop a tool that would allow developers to build powerful REST APIs with minimal overhead and I believe we have done that! I still have plenty of hopes and dreams for the future of the project, but as of now I’m proud of what we’ve accomplished.

Is it the only tool out there of its kind? Nope.

Does it fit every situation? Of course not!

Is it useful for you? We’re hoping you’ll check it out and decide for yourself! We’d love to hear your feedback. If you do like it, feel free to give it a star on GitHub 😉

In a future post I’ll go into more details of the design philosophy behind rest-hapi along with some hands-on examples of how you can use it to build your own awesome REST APIs.

If you want to get in touch you can reach me at Twitter, Facebook, or LinkedIn, or email me at headley.justin@gmail.com. Hope you enjoyed the post. Thanks for reading!

Clap this up if you enjoyed the article. Feedback is always greatly appreciated. Don’t forget you can clap up to 50 times! ❤