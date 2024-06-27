import stat
from telnetlib import STATUS
from rest_framework import generics
from .models import AtributesObject, Objeto , Lostobject, Foundobject, Generaluser, Userpolice, PolicePost,Leilao, Licitacao, Category, CategoryAttribute, Subscription, Address
from .serializers import (
    AtributesObjectSerializer, LostobjectSerializer, FoundobjectSerializer, GeneraluserSerializer,
    UserpoliceSerializer, PolicePostSerializer, LeilaoSerializer, LicitacaoSerializer,
    CategorySerializer, CategoryAttributeSerializer, SubscriptionSerializer,
    AddressSerializer, ObjetoSerializer
)
from utils.utils import find_similar_objects, compare_objects

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated


#---------------------------------------------------------
#---------Contas e sessões de utilizadores----------------
#---------------------------------------------------------

class GeneralUserListCreateAPIView(generics.ListCreateAPIView):
    queryset = Generaluser.objects.all()
    serializer_class = GeneraluserSerializer
    permission_classes = [AllowAny]

class GeneralUserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Generaluser.objects.all()
    serializer_class = GeneraluserSerializer
    permission_classes = [AllowAny]

class GeneralUserRetrieveUpdateDestroyAPIView_Email(generics.RetrieveUpdateDestroyAPIView):
    queryset = Generaluser.objects.all()
    serializer_class = GeneraluserSerializer
    permission_classes = [AllowAny]
    lookup_field = 'email'

class UserPoliceListCreateAPIView(generics.ListCreateAPIView):
    queryset = Userpolice.objects.all()
    serializer_class = UserpoliceSerializer
    permission_classes = [AllowAny]

class UserPoliceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Userpolice.objects.all()
    serializer_class = UserpoliceSerializer
    permission_classes = [AllowAny]

class UserPoliceRetrieveUpdateDestroyAPIView_Email(generics.RetrieveUpdateDestroyAPIView):
    queryset = Userpolice.objects.all()
    serializer_class = UserpoliceSerializer
    permission_classes = [AllowAny]
    lookup_field = 'email'

class PolicePostListCreateAPIView(generics.ListCreateAPIView):
    queryset = PolicePost.objects.all()
    serializer_class = PolicePostSerializer
    permission_classes = [AllowAny]


class PolicePostRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PolicePost.objects.all()
    serializer_class = PolicePostSerializer
    permission_classes = [AllowAny]


#---------------------------------------------------------
#-----------Objectos perdidos e achados-------------------
#---------------------------------------------------------


class ObjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Objeto.objects.all()
    serializer_class = ObjetoSerializer
    permission_classes = [AllowAny]

class ObjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Objeto.objects.all()
    serializer_class = ObjetoSerializer
    permission_classes = [AllowAny]

class LostObjectListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = LostobjectSerializer
    queryset = Lostobject.objects.all()
    permission_classes = [AllowAny]

class LostObjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lostobject.objects.all()
    serializer_class = LostobjectSerializer
    permission_classes = [AllowAny]

class LostObjectHistoryListAPIView(generics.ListAPIView):
    serializer_class = LostobjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs.get('pk')  # Captura o ID do usuário a partir da URL
        lost_objects = Lostobject.objects.filter(generaluser_id=user_id)  # Filtra os objetos perdidos pelo ID do usuário
        return lost_objects
    
class LostObjectSearchAPIView(generics.ListAPIView):
    serializer_class = LostobjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        description = self.kwargs.get('description')  # Captura o parâmetro 'description' da URL
        lost_objects = Lostobject.objects.filter(objeto_id__description__icontains=description)
        return lost_objects

class LostObjectSearchCategoryAPIView(generics.ListAPIView):
    serializer_class = LostobjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs.get('pk')  # Captura o parâmetro 'pk' da URL
        lost_objects = Lostobject.objects.filter(objeto_id__category=pk)
        return lost_objects

class SimilarLostObjectListAPIView(generics.ListAPIView): #REFAZER
    serializer_class = LostobjectSerializer

    def get_queryset(self):
        reported_lost_object = self.request.data.get('reported_lost_object')
        similar_lost_objects = find_similar_objects(reported_lost_object)
        return similar_lost_objects

class LostObjectCompareByCategoryAPIView(generics.ListAPIView):
    serializer_class = FoundobjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        lost_object_id = self.kwargs.get('pk')
        lost_object = Lostobject.objects.get(id=lost_object_id)

        # Obtém a categoria do objeto perdido
        lost_object_category = lost_object.objeto_id.category

        # Filtra objetos encontrados que pertencem à mesma categoria que o objeto perdido
        found_objects = Foundobject.objects.filter(objeto_id__category=lost_object_category)

        return found_objects

class FoundObjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Foundobject.objects.all()
    serializer_class = FoundobjectSerializer
    permission_classes = [AllowAny]

class FoundObjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Foundobject.objects.all()
    serializer_class = FoundobjectSerializer
    permission_classes = [AllowAny]

class FoundObjectHistoryListAPIView(generics.ListAPIView):
    serializer_class = FoundobjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        found_objects = Foundobject.objects.filter(owner=user)
        return found_objects

class FoundObjectChangeOwnerAPIView(generics.RetrieveUpdateAPIView):
    queryset = Foundobject.objects.all()
    serializer_class = FoundobjectSerializer
    permission_classes = [AllowAny]

    def put(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)

class FoundObjectDelivered(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return Foundobject.objects.get(pk=pk)
        except Foundobject.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        found_object = self.get_object(pk)
        serializer = FoundobjectSerializer(found_object)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        found_object = self.get_object(pk)
        found_object.delivered = True
        serializer = FoundobjectSerializer(found_object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class CategoryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class CategoryAttributeListCreateAPIView(generics.ListCreateAPIView):
    queryset = CategoryAttribute.objects.all()
    serializer_class = CategoryAttributeSerializer
    permission_classes = [AllowAny]


class CategoryAttributeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CategoryAttribute.objects.all()
    serializer_class = CategoryAttributeSerializer
    permission_classes = [AllowAny]


class CategoryAttributeListAPIView(generics.ListAPIView):
    serializer_class = CategoryAttributeSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        category_pk = self.kwargs.get('pk')  # Corrigido para pegar 'pk' dos kwargs da URL
        attributes = CategoryAttribute.objects.filter(category_id=category_pk)  # Filtra pelo ID da categoria
        return attributes
    
class AtributesObjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = AtributesObject.objects.all()
    serializer_class = AtributesObjectSerializer
    permission_classes = [AllowAny]

class AtributesObjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AtributesObject.objects.all()
    serializer_class = AtributesObjectSerializer
    permission_classes = [AllowAny]

class AtributesObjectViewObject(generics.ListAPIView):
    serializer_class = AtributesObjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        object = self.kwargs.get('pk')
        if object is not None:
            attributes = AtributesObject.objects.filter(object_id=object)
        else:
            attributes = AtributesObject.objects.none()
        return attributes

#---------------------------------------------------------
#---------Leilões de objetos não reclamados---------------
#---------------------------------------------------------

class AuctionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Leilao.objects.all()
    serializer_class = LeilaoSerializer
    permission_classes = [AllowAny]


class AuctionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Leilao.objects.all()
    serializer_class = LeilaoSerializer
    permission_classes = [AllowAny]

class BidListCreateAPIView(generics.ListCreateAPIView):
    queryset = Licitacao.objects.all()
    serializer_class = LicitacaoSerializer
    permission_classes = [AllowAny]

class BidRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Licitacao.objects.all()
    serializer_class = LicitacaoSerializer
    permission_classes = [AllowAny]


class AuctionHistoryListAPIView(generics.ListAPIView):
    serializer_class = LeilaoSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        auctions = Leilao.objects.filter(owner=user)
        return auctions

class AuctionBoughtListAPIView(generics.ListAPIView):
    serializer_class = LeilaoSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        auctions = Leilao.objects.filter(buyer=user)
        return auctions

class AuctionBidListAPIView(generics.ListAPIView):
    serializer_class = LicitacaoSerializer
    permission_classes = [AllowAny]


    def get_queryset(self):
        leilao_id = self.kwargs['pk']
        return Licitacao.objects.filter(leilao_id=leilao_id)

class AuctionDetailAPIView(APIView):
    def put(self, request, auction_id):
        try:
            auction = Leilao.objects.get(pk=auction_id)
        except Leilao.DoesNotExist:
            return Response({'error': 'Leilao não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        # Atualize o valor da maior_licitacao com base nos dados recebidos na requisição
        auction.maior_licitacao = request.data.get('maior_licitacao', auction.maior_licitacao)
        auction.save()

        return Response({'success': 'Valor da licitação atualizado com sucesso.'})

class SubscriptionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [AllowAny]

class SubscriptionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [AllowAny]

#---------------------------------------------------------
#---------------------Outras precisas---------------------
#---------------------------------------------------------

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [AllowAny]

class AddressListCreateAPIView(generics.ListCreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [AllowAny]

class AddressRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [AllowAny]

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(data={"message": "Hello, you are authenticated!"}, status=200)
