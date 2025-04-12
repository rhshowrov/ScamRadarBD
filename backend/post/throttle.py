from rest_framework.throttling import UserRateThrottle

class BookmarkThrottle(UserRateThrottle):
    rate = '5/min'  # Set your custom rate

class PremiumUserThrottle(UserRateThrottle):
    def get_rate(self):
        user = self.scope.get('user') or getattr(self.request, 'user', None)
        if user and user.is_authenticated and user.is_premium:
            return '100/minute'  # Premium users get higher limit
        return '10/minute'