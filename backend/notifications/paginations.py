from rest_framework.pagination import PageNumberPagination
class CustomNotificationPagination(PageNumberPagination):
    page_size = 5                # Items per page
    page_size_query_param = 'page_size'  # Allow client to override ?page_size=
    max_page_size = 50