# example/views.py
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import BlogPost
import json
import random

def index(request):
    html = f'''Blog API is working fine!'''
    return HttpResponse(html)


@csrf_exempt
def write_blog(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            blog_title = data.get('blog_title')
            blog_content = data.get('blog_content')
            blog_tags = data.get('blog_tags')
            blog_links = data.get('blog_links_list')
            blog_tags = [tag.strip() for tag in blog_tags.split(',')]
            blog_links = [link.strip() for link in blog_links.split(',')]
            unique_id = ''.join(random.choices('0123456789', k=10))
            
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
        
        blog_post = BlogPost(
            id=int(unique_id),
            title=blog_title,
            content=blog_content,
            tags=blog_tags,
            links=blog_links
        )
        blog_post.save()
        
        return JsonResponse({'status': 'success', 'message': 'Blog post created successfully', 'id': unique_id})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
    
    
def get_blogs(request):
    try:
        blogs = BlogPost.objects.all()
        blog_list = []
        for blog in blogs:
            blog_data = {
                'id': blog.id,
                'title': blog.title,
                'content': blog.content,
                'tags': blog.tags,
                'links': blog.links
            }
            blog_list.append(blog_data)
        return JsonResponse({'status': 'success', 'blogs': blog_list})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})
    
def delete_blog(request, blog_id):
    try:
        blog = BlogPost.objects.get(id=blog_id)
        blog.delete()
        return JsonResponse({'status': 'success', 'message': 'Blog post deleted successfully'})
    except BlogPost.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Blog post not found'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})
    

def delete_all_blogs(request):
    if request.method == 'POST':
        try:
            BlogPost.objects.all().delete()
            return JsonResponse({'status': 'success', 'message': 'All blog posts deleted successfully'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})


@method_decorator(csrf_exempt, name='dispatch')
def delete_all_blogs(request):
    if request.method == 'DELETE':
        try:
            BlogPost.objects.all().delete()
            return JsonResponse({'status': 'success', 'message': 'All blog posts deleted successfully'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})