from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def fileUpload(request):
    print("coming here?")

    # Open and read the files using OCR package
    # Store the file's content in db

    return HttpResponse("Hello, world. You're at the polls index.")

def search(request):
    print("coming here?")
    # Retrieve all results 
    # Use gpt to return the result based on the file's contents

    return HttpResponse("Hello, world. You're at the polls index.")