from django.db import models

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    tags = models.JSONField()
    links = models.JSONField()

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'blog_blogpost'
