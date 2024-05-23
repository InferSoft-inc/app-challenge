from django.db import models


# Create your models here.

class fileData(models.Model):  # Viewed by User
    id = models.AutoField(primary_key=True)
    fileName = models.TextField()
    fileLink = models.TextField(null=True)
    data = models.TextField()
