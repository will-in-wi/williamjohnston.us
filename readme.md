# williamjohnston.us website

Hello! This is the source code underlying the 2020 campaign site for Minnesota State Representative for HD53A.

If you live in this area, vote for me!

If you don't, maybe you'll find the code interesting.

## Quickstart

To see the website, run `yarn serve` and visit http://localhost:9000

To build the website, run `yarn build`. It'll be in the build folder.

## Structure

Built using Nunjucks templating for its Gulp support and Django-style inheritance.

Using a rough MCSS structure for CSS.

General principle of not importing libraries unless we can't help it. Sites like this should download it almost no time flat and be tiny. Let's deliver on that.
