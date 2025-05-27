from django.db import models
from django.contrib.auth.models import User

# One-to-Many: Un autor puede tener muchos artículos
class Author(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.name

# One-to-One: Cada usuario tiene un perfil
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar_url = models.URLField(blank=True)

    def __str__(self):
        return self.user.username

# Many-to-Many: Un artículo puede tener muchas etiquetas, y una etiqueta puede estar en muchos artículos
class Tag(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

# Artículo con relaciones
class Article(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    # One-to-Many
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        related_name="articles",
        null=True,  # permite que no haya autor al principio
        blank=True
    )   

    # Many-to-Many
    tags = models.ManyToManyField(Tag, related_name="articles", blank=True)

    def __str__(self):
        return self.title
