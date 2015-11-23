###
# Blog settings
###

# Time.zone = "UTC"

# require 'rack'
# require 'rack/contrib/try_static'
# require 'rack-zippy'
# require 'zippy_static_cache'

# use ZippyStaticCache, :urls => ['/images', '/stylesheets', '/javascripts', '/fonts']
# use Rack::Zippy::AssetServer, 'build'
# use Rack::TryStatic,
#   root: 'build',
#   urls: %w[/],
#   try: ['.html', 'index.html', '/index.html']

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "blog"

  # Matcher for blog source files
  blog.sources = "{year}-{month}-{day}-{title}.html"
  blog.taglink = "tags/{tag}.html"
  blog.layout = "layouts/layout_blog"
  blog.summary_separator = /(READMORE)/
  blog.summary_length = 250
  blog.year_link = "{year}.html"
  blog.month_link = "{year}/{month}.html"
  blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".markdown"

  #blog.permalink = "{year}/{month}/{day}/{title}.html"
  blog.permalink = "{title}.html"

  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = "page/{num}"
end

page "/feed.xml", layout: false

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", layout: false
#
# With alternative layout
 page "/upstate/L4TSXcvbQlfYgQ5J/application.html", layout: :layout_blog
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

# set :markdown_engine, :redcarpet
# set :markdown, :fenced_code_blocks => true, :smartypants => true
set :markdown_engine, :rdiscount
#activate :rouge_syntax
#activate :syntax

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
activate :google_analytics do |ga|
  ga.tracking_id = 'UA-61921206-1' # Replace with your property ID.
  ga.domain_name = 'hightopsnyc.com'
  ga.minify = true
end

 activate :livereload


  compass_config do |config|
    # Require any additional compass plugins here.
    config.add_import_path "bower_components/fullpage.js/"

    config.output_style = :compressed
  end

  after_configuration do
    @bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
    sprockets.append_path File.join "#{root}", @bower_config["directory"]
  end

  activate :imageoptim do |options|
    # Use a build manifest to prevent re-compressing images between builds
    options.manifest = true

    # Silence problematic image_optim workers
    options.skip_missing_workers = true

    # Cause image_optim to be in shouty-mode
    options.verbose = false

    # Setting these to true or nil will let options determine them (recommended)
    options.nice = true
    options.threads = true

    # Image extensions to attempt to compress
    options.image_extensions = %w(.png .jpg .gif .svg)

    # Compressor worker options, individual optimisers can be disabled by passing
    # false instead of a hash
    options.advpng    = { :level => 4 }
    options.gifsicle  = { :interlace => false }
    options.jpegoptim = { :strip => ['all'], :max_quality => 100 }
    options.jpegtran  = { :copy_chunks => false, :progressive => true, :jpegrescan => true }
    options.optipng   = { :level => 6, :interlace => false }
    options.pngcrush  = { :chunks => ['alla'], :fix => false, :brute => false }
    options.pngout    = { :copy_chunks => false, :strategy => 0 }
    options.svgo      = {}
  end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :build_dir, 'tmp'

set :fonts_dir,  "fonts-folder"

activate :meta_tags
 # set_meta_tags title: ''
 # title 'High Tops'
set_meta_tags description: ''
description 'High Tops is a web development consultancy based in NYC. We guide our clients to the best decisions in tech.'
set_meta_tags keywords: %w().join(', ')
keywords %w(web development consulting design responsive mobile ux ruby on rails javascript apps marketing seo).join(', ')

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css
  activate :protect_emails
  activate :gzip
  activate :minify_html


  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Conent/images/"

  set :url_root, "https://#{ENV['APP_DOMAIN'] ? ENV['APP_DOMAIN'] : 'localhost:4567'}"

  activate :search_engine_sitemap,
           exclude_if: -> (resource) {
             # Exclude all paths from sitemap that are sub-date indexes
             resource.path.match(/[0-9]{4}(\/[0-9]{2})*.html/)
           },
           default_change_frequency: 'weekly'

  # Filewatcher ignore list (workaround for search_engine_sitemap on
  # Heroku - see https://github.com/Aupajo/middleman-search_engine_sitemap/issues/2)
  set :file_watcher_ignore,
      [
          /^bin(\/|$)/,
          /^\.bundle(\/|$)/,
          # /^vendor(\/|$)/,
          /^node_modules(\/|$)/,
          /^\.sass-cache(\/|$)/,
          /^\.cache(\/|$)/,
          /^\.git(\/|$)/,
          /^\.gitignore$/,
          /\.DS_Store/,
          /^\.rbenv-.*$/,
          /^Gemfile$/,
          /^Gemfile\.lock$/,
          /~$/,
          /(^|\/)\.?#/,
          /^tmp\//
      ]
end
