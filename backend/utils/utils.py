from app.models import Lostobject, Foundobject

def find_similar_objects(reported_lost_object):
    # Extrair informações do objeto perdido relatado
    reported_category = reported_lost_object.category
    reported_attributes = reported_lost_object.attributes.all()
    reported_location = reported_lost_object.location

    # Encontrar objetos encontrados na mesma categoria e zona
    similar_found_objects = Foundobject.objects.filter(
        category=reported_category,
        attributes__in=reported_attributes,
        location=reported_location
    )

    return similar_found_objects

def compare_objects(lost_object, found_object):
    lost_attributes = lost_object.attributes.all()
    found_attributes = found_object.attributes.all()

    different_attributes = []
    for attribute in lost_attributes:
        if attribute not in found_attributes:
            different_attributes.append(attribute)

    return different_attributes
