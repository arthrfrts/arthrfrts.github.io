# frozen_string_literal: true
class BidirectionalLinksGenerator < Jekyll::Generator
  def generate(site)
    graph_nodes = []
    graph_edges = []

    all_docs = site.posts.docs

    link_extension = !!site.config["use_html_extension"] ? '.html' : ''

    # Convert all Wiki/Roam-style double-bracket link syntax to plain HTML
    # anchor tag elements (<a>) with "internal-link" CSS class
    all_docs.each do |current_post|
      all_docs.each do |post_potentially_linked_to|
        title_from_filename = File.basename(
          post_potentially_linked_to.basename,
          File.extname(post_potentially_linked_to.basename)
        ).gsub('_', ' ').gsub('-', ' ').capitalize

        new_href = "#{site.baseurl}#{post_potentially_linked_to.url}#{link_extension}"
        anchor_tag = "<a class='internal-link' href='#{new_href}'>\\1</a>"

        # Replace double-bracketed links with label using post title
        # [[A post about cats|this is a link to the post about cats]]
        current_post.content.gsub!(
          /\[\[#{title_from_filename}\|(.+?)(?=\])\]\]/i,
          anchor_tag
        )

        # Replace double-bracketed links with label using post filename
        # [[cats|this is a link to the post about cats]]
        current_post.content.gsub!(
          /\[\[#{post_potentially_linked_to.data['title']}\|(.+?)(?=\])\]\]/i,
          anchor_tag
        )

        # Replace double-bracketed links using post title
        # [[a post about cats]]
        current_post.content.gsub!(
          /\[\[(#{post_potentially_linked_to.data['title']})\]\]/i,
          anchor_tag
        )

        # Replace double-bracketed links using post filename
        # [[cats]]
        current_post.content.gsub!(
          /\[\[(#{title_from_filename})\]\]/i,
          anchor_tag
        )
      end

      # At this point, all remaining double-bracket-wrapped words are
      # pointing to non-existing pages, so let's turn them into disabled
      # links by greying them out and changing the cursor
      current_post.content = current_post.content.gsub(
        /\[\[([^\]]+)\]\]/i, # match on the remaining double-bracket links
        <<~HTML.delete("\n") # replace with this HTML (\\1 is what was inside the brackets)
          <span title='There is no post that matches this link.' class='invalid-link'>
            <span class='invalid-link-brackets'>[[</span>
            \\1
            <span class='invalid-link-brackets'>]]</span></span>
        HTML
      )
    end

    # Identify post backlinks and add them to each post
    all_posts.each do |current_post|
      # Nodes: Jekyll
      posts_linking_to_current_post = all_posts.filter do |e|
        e.content.include?(current_post.url)
      end

      # Nodes: Graph
      graph_nodes << {
        id: post_id_from_post(current_post),
        path: "#{site.baseurl}#{current_post.url}#{link_extension}",
        label: current_post.data['title'],
      } unless current_post.path.include?('_posts/index.html')

      # Edges: Jekyll
      current_post.data['backlinks'] = posts_linking_to_current_post

      # Edges: Graph
      posts_linking_to_current_post.each do |n|
        graph_edges << {
          source: post_id_from_post(n),
          target: post_id_from_post(current_post),
        }
      end
    end

    File.write('_includes/posts_graph.json', JSON.dump({
      edges: graph_edges,
      nodes: graph_nodes,
    }))
  end

  def post_id_from_post(post)
    post.data['title']
      .dup
      .gsub(/\W+/, ' ')
      .delete(' ')
      .to_i(36)
      .to_s
  end
end
