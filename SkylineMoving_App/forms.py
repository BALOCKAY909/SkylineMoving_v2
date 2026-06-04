from django import forms
from django.core.validators import RegexValidator
from .models import Contact

class ContactForm(forms.ModelForm):
    name = forms.CharField(
        validators=[RegexValidator(regex=r'^[a-zA-Z]+ [a-zA-Z]+$', message='Enter your first and last name (e.g. John Doe)')],
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Full Name',
            'required': True,
            'pattern': '[a-zA-Z]+ [a-zA-Z]+',
            'title': 'Enter your first and last name (e.g. John Doe)'
        })
    )
    email = forms.EmailField(
        validators=[RegexValidator(regex=r'^[a-zA-Z0-9._+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$', message='Enter a valid email address (e.g. user@example.com)')],
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Email',
            'required': True,
            'pattern': '[a-zA-Z0-9._+\\-]+@[a-zA-Z0-9\\-]+\\.[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})?',
            'title': 'Enter a valid email address (e.g. user@example.com)'
        })
    )
    phone = forms.CharField(
        validators=[RegexValidator(regex=r'^[0-9]{10}$', message='Enter a valid 10-digit phone number (e.g. 5312225122)')],
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Phone Number',
            'required': True,
            'pattern': '[0-9]{10}',
            'maxlength': '10',
            'minlength': '10',
            'title': 'Enter a valid 10-digit phone number (e.g. 5312225122)'
        })
    )
    description = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Job Description (Optional)'})
    )

    class Meta:
        model = Contact
        fields = ['name', 'email', 'phone', 'description']

