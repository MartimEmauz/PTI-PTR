from .object_models import LostObject, FoundObject

def find_similar_objects(reported_lost_object):
    # Extrair informações do objeto perdido relatado
    reported_category = reported_lost_object.category
    reported_attributes = reported_lost_object.attributes.all()
    reported_location = reported_lost_object.location

    # Encontrar objetos encontrados na mesma categoria e zona
    similar_found_objects = FoundObject.objects.filter(
        category=reported_category,
        attributes__in=reported_attributes,
        location=reported_location
    )

    return similar_found_objects
