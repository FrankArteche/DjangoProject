from django.contrib import admin
from .models import Article, Author, Tag, UserProfile

admin.site.register(Article)
admin.site.register(Author)
admin.site.register(Tag)
admin.site.register(UserProfile)
