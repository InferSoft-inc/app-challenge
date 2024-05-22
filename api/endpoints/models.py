from django.db import models


# Create your models here.

class User(models.Model):  # Viewed by User
    id = models.AutoField(primary_key=True)
    file = models.TextField()
    data = models.TextField()
