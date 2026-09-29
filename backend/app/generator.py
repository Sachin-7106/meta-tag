import html
from typing import Dict, Any, List
from app.models import MetaTagInput, MetaTagOutput

def generate_meta_tags(data: MetaTagInput) -> MetaTagOutput:
    warnings: List[str] = []

    title = data.title.strip() if data.title else ""
    description = data.description.strip() if data.description else ""
    url = data.url.strip() if data.url else "https://example.com"
    image_url = data.image_url.strip() if data.image_url else "https://example.com/og-image.jpg"
    twitter_card = data.twitter_card_type.strip() if data.twitter_card_type else "summary_large_image"
    site_name = data.site_name.strip() if data.site_name else "MetaForge"
    author = data.author.strip() if data.author else ""
    keywords = data.keywords.strip() if data.keywords else ""
    robots = data.robots.strip() if data.robots else "index, follow"
    theme_color = data.theme_color.strip() if data.theme_color else "#0f172a"

    # Validation checks
    if len(title) == 0:
        warnings.append("Page Title is empty.")
    elif len(title) > 60:
        warnings.append(f"Title is long ({len(title)} chars). Recommended length is 50-60 characters for optimal search display.")

    if len(description) == 0:
        warnings.append("Meta Description is empty.")
    elif len(description) > 160:
        warnings.append(f"Description is long ({len(description)} chars). Recommended length is 150-160 characters for search snippets.")

    if not url.startswith("http://") and not url.startswith("https://"):
        warnings.append("Page URL should start with http:// or https://")

    if not image_url.startswith("http://") and not image_url.startswith("https://"):
        warnings.append("Image URL should start with http:// or https://")

    # Escape html special characters
    safe_title = html.escape(title)
    safe_desc = html.escape(description)
    safe_url = html.escape(url)
    safe_image = html.escape(image_url)
    safe_site_name = html.escape(site_name)
    safe_author = html.escape(author)
    safe_keywords = html.escape(keywords)
    safe_robots = html.escape(robots)
    safe_theme_color = html.escape(theme_color)

    # Build HTML string
    lines = [
        "<!-- HTML Meta Tags -->",
        f"<title>{safe_title}</title>",
        f'<meta name="description" content="{safe_desc}" />',
    ]

    if safe_keywords:
        lines.append(f'<meta name="keywords" content="{safe_keywords}" />')
    if safe_author:
        lines.append(f'<meta name="author" content="{safe_author}" />')

    lines.extend([
        f'<meta name="robots" content="{safe_robots}" />',
        f'<meta name="theme-color" content="{safe_theme_color}" />',
        f'<link rel="canonical" href="{safe_url}" />',
        "",
        "<!-- Facebook / Open Graph -->",
        '<meta property="og:type" content="website" />',
        f'<meta property="og:url" content="{safe_url}" />',
        f'<meta property="og:title" content="{safe_title}" />',
        f'<meta property="og:description" content="{safe_desc}" />',
        f'<meta property="og:image" content="{safe_image}" />',
        f'<meta property="og:site_name" content="{safe_site_name}" />',
        "",
        "<!-- Twitter Cards -->",
        f'<meta name="twitter:card" content="{twitter_card}" />',
        f'<meta name="twitter:url" content="{safe_url}" />',
        f'<meta name="twitter:title" content="{safe_title}" />',
        f'<meta name="twitter:description" content="{safe_desc}" />',
        f'<meta name="twitter:image" content="{safe_image}" />',
    ])

    formatted_html = "\n".join(lines)
    tag_count = len([line for line in lines if line.startswith("<meta") or line.startswith("<title") or line.startswith("<link")])

    tags_dict = {
        "title": title,
        "description": description,
        "url": url,
        "image_url": image_url,
        "twitter_card": twitter_card,
        "site_name": site_name,
        "author": author,
        "keywords": keywords,
        "robots": robots,
        "theme_color": theme_color,
    }

    return MetaTagOutput(
        html=formatted_html,
        tag_count=tag_count,
        char_count_title=len(title),
        char_count_description=len(description),
        validation_warnings=warnings,
        tags=tags_dict
    )
