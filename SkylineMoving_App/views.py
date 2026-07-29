import os
from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from .forms import ContactForm

def get_quote_form():
    return ContactForm()

def quote_submission_handler(request):
    form = ContactForm(request.POST)
    if form.is_valid():
        form.save()
        name = form.cleaned_data['name']
        email = form.cleaned_data['email']
        phone = form.cleaned_data['phone']
        description = form.cleaned_data.get('description', 'N/A')
        send_mail(
            subject=f'New Quote Request from {name}',
            message=f'Name: {name}\nEmail: {email}\nPhone: {phone}\nJob Description: {description}',
            from_email=os.environ.get('EMAIL_HOST_USER'),
            recipient_list=[os.environ.get('EMAIL_HOST_USER')],
        )
        messages.success(request, 'Your quote request has been submitted! We will be in touch shortly.')
        return True, form
    return False, form

def home(request):
    if request.method == 'POST':
        success, form = quote_submission_handler(request)
        if success:
            return redirect('/')
    else:
        form = get_quote_form()
    return render(request, 'home.html', {'form': form})

def about(request):
    return render(request, 'about.html')

def reviews(request):
    return render(request, 'reviews.html')

def contact(request):
    if request.method == 'POST':
        success, form = quote_submission_handler(request)
        if success:
            return redirect('/contact/')
    else:
        form = get_quote_form()
    return render(request, 'contact.html', {'form': form})
