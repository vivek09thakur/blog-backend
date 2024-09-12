# example/views.py
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import BlogPost
import json


def index(request):
    html = f'''Blog API is working fine!'''
    return HttpResponse(html)


@csrf_exempt
def write_blog(request):
    if request.method == 'POST':
        blog_title = request.POST.get('blog_title')
        blog_content = request.POST.get('blog_content')
        blog_tags = request.POST.get('blog_tags')
        blog_links = request.POST.get('blog_links_list')
        blog_tags = [tag.strip() for tag in blog_tags.split(',')]
        blog_links = [link.strip() for link in blog_links.split(',')]
        
        # Create and save the blog post using Django's ORM
        blog_post = BlogPost(
            title=blog_title,
            content=blog_content,
            tags=blog_tags,
            links=blog_links
        )
        blog_post.save()
        
        return JsonResponse({'status': 'success', 'message': 'Blog post created successfully'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def get_blogs(request):
    try:
        blogs = BlogPost.objects.all()
        blog_list = []
        for blog in blogs:
            blog_data = {
                'title': blog.title,
                'content': blog.content,
                'tags': blog.tags,
                'links': blog.links
            }
            blog_list.append(blog_data)
        return JsonResponse({'status': 'success', 'blogs': blog_list})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})
