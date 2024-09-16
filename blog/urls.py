# example/urls.py
from django.urls import path

from blog.views import index,write_blog,get_blogs,delete_all_blogs,delete_blog,auth,get_blog_by_id


urlpatterns = [
    path('', index),
    path("auth/", auth, name='auth'),
    path('write_blog/', write_blog, name='write_blog'),
    path('get_blogs/', get_blogs, name='get_blogs'),
    path('get_blog_by_id/<blog_id>/', get_blog_by_id, name='get_blog_by_id'),
    path('delete_blog/<blog_id>/', delete_blog, name='delete_blog'),
    path('delete_all/', delete_all_blogs, name='delete_all'),
]