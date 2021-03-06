# Generated by Django 2.0 on 2018-08-28 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0033_post_image_caption'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.TextField(blank=True, help_text='use MD', null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='image_caption',
            field=models.CharField(blank=True, help_text='Describe the image', max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='lead_text',
            field=models.TextField(help_text='Shall appear on index page', null=True),
        ),
    ]
