# frozen_string_literal: true
module PersonalSeries
  class Pages < Jekyll::Generator
    safe true
    priority :low
    def generate(site)
      (site.data["series"] || {}).each do |id, series|
        next unless series["published"] == true
        raise "Approved series needs an introduction: #{id}" if series["introduction"].to_s.strip.empty?
        site.pages << Jekyll::PageWithoutAFile.new(site, site.source, series.fetch("url").sub(%r{^/}, ""), "index.html").tap do |page|
          page.data.merge!("layout" => "page", "title" => series.fetch("title"), "series" => id)
          page.content = "{{ site.data.series[page.series].introduction | markdownify }}\n{% include series-nav.html %}"
        end
      end
    end
  end
end
Jekyll::Hooks.register :posts, :pre_render do |post|
  marker = "{% include article-contact.html %}"
  unless post.content.include?(marker)
    post.content += "\n\n{% include series-nav.html %}\n#{marker}"
  end
end
