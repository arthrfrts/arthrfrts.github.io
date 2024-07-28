# Personal Website

This is my public GitHub showcase, available at <https://arthr.dev>. It hosts my most recent projects and current interests.

It's mostly a [Jekyll website](https://jekyllrb.com) hosted with GitHub Pages and using the GitHub API to grab my account data. If you want to read what I'm writing these days, visit my blog at <https://arthr.me/>.

## Installation

To install and run this repo locally, [install Jekyll in your machine](https://jekyllrb.com/docs/installation/), clone this repo and then:

```bash
$ cd arthrfrts.github.io
$ bundle
$ bundle exec jekyll serve
```

Now you can browse to <http://localhost:4000> and see the local copy of this repo in action.

# arthr.me

This is my personal website, available at <https://arthr.me>. It hosts my profile, blog and reading list.

It's mostly a blog powered by [Jekyll](https://jekyllrb.com) hosted in GitHub Pages (for now?)

## Using it as a theme

You can use this website as a remote theme in your blog.

To do

```bash
bundle add jekyll-remote-theme
```

Then, in your `_config.yml`:

```bash
plugins:
  # Add the newsly installed plugin to your plugins list
  - jekyll-remote-theme

# Let Jekyll know that you'll use this repo as your new theme.
remote_theme: arthrfrts/arthrfrts.github.io
```

Enjoy :)
