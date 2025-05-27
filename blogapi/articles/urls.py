from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, AuthorViewSet, TagViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'tags', TagViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
