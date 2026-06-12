from django.urls import path
from SkylineMoving_App import views
from django.contrib.sitemaps.views import sitemap
from SkylineMoving_App.sitemaps import StaticViewSitemap
from django.http import HttpResponse

sitemaps = {
    "static": StaticViewSitemap,
}

def robots_txt(request):
    lines = [
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin/",
        "Sitemap: https://skylinemovinggp.com/sitemap.xml",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('reviews/', views.reviews, name='reviews'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'),
    path('robots.txt', robots_txt),
]