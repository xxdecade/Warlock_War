from django.http import HttpResponse

def index(request):
    line1 = '<h1 style="text-align: center">原神</h1>'
    line2 = '<img src="https://cdn1.epicgames.com/salesEvent/salesEvent/Landscape%20Product%20image-CHT_2560x1440-e263d461e84ff35235be426313a9aea3", width = 1500>'
    line3 = '<img src="https://p3-sdbk2-media.byteimg.com/tos-cn-i-xv4ileqgde/bba754eb45534017b7bb2d3f8d37dfb7~tplv-xv4ileqgde-resize-w:750.image">'
    return HttpResponse(line1 + line2 + line3)

