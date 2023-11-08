from django.http import JsonResponse
from game.models.player.player import Player

def getinfo_ac(request):
    player = Player.objects.all()[0]
    return JsonResponse({
        'result': "success",
        'username': player.user.username,
        'photo': player.photo,
    })

def getinfo_web(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse ({
            'result': "nologin"
        })
    else:
        player = Player.objects.get(user=user)
        return JsonResponse({
            'result': "success",
            'username': player.user.username,
            'photo': player.photo,
            })

def getinfo(request):
    platform = request.GET.get('platform')
    if platform == 'ac':
        return getinfo_ac(request)
    elif platform == 'web':
        return getinfo_web(request)
