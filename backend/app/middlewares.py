# middlewares.py

import json
from urllib.request import urlopen
from jose import jwt

from django.conf import settings
from django.http import JsonResponse

class Auth0JWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.headers.get('Authorization', None)
        if token:
            token = token.split(' ')[1]
            try:
                jsonurl = urlopen(f'https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json')
                jwks = json.loads(jsonurl.read())
                unverified_header = jwt.get_unverified_header(token)
                rsa_key = {}
                for key in jwks['keys']:
                    if key['kid'] == unverified_header['kid']:
                        rsa_key = {
                            'kty': key['kty'],
                            'kid': key['kid'],
                            'use': key['use'],
                            'n': key['n'],
                            'e': key['e']
                        }
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=['RS256'],
                    audience=settings.API_IDENTIFIER,
                    issuer=f'https://{settings.AUTH0_DOMAIN}/'
                )
                request.user = payload
            except jwt.ExpiredSignatureError:
                return JsonResponse({'error': 'token_expired'}, status=401)
            except jwt.JWTClaimsError:
                return JsonResponse({'error': 'invalid_claims'}, status=401)
            except Exception:
                return JsonResponse({'error': 'invalid_header'}, status=401)
        return self.get_response(request)
