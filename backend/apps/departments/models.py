from django.db import models

# Create your models here.
class Department(models.Model):
	name = models.CharField(max_length=100, unique=True)
	description = models.TextField(blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	# 🔧 Safe enhancement: better admin display
	class Meta:
		verbose_name = "Department"
		verbose_name_plural = "Departments"
		ordering = ['name']

	def __str__(self):
		return self.name

	# 🔧 Safe enhancement: helper method (no DB impact)
	def has_description(self):
		return bool(self.description and self.description.strip())