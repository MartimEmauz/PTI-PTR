from django.test import TestCase
from django.urls import reverse

class LostObjectAPITest(TestCase):
    def test_lost_objects_list(self):
        response = self.client.get(reverse('lostobject-list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'List all lost objects')