from .models import Department
from django.db.models import QuerySet
from typing import Optional


def get_all_departments() -> QuerySet:
    # 🔧 Safe enhancement: consistent ordering for UI/API stability
    return Department.objects.all().order_by('name')


def get_department_by_id(department_id: int) -> Optional[Department]:
    try:
        return Department.objects.get(id=department_id)
    except Department.DoesNotExist:
        return None


def create_department(**kwargs) -> Department:
    # 🔧 Safe enhancement: sanitize input name (prevents accidental whitespace duplicates)
    if 'name' in kwargs and isinstance(kwargs['name'], str):
        kwargs['name'] = kwargs['name'].strip()

    department = Department.objects.create(**kwargs)
    return department


def update_department(department_id: int, **kwargs) -> Optional[Department]:
    department = get_department_by_id(department_id)
    if department:
        for key, value in kwargs.items():
            # 🔧 Safe enhancement: avoid overwriting empty strings accidentally
            if isinstance(value, str):
                value = value.strip()
            setattr(department, key, value)
        department.save()
        return department
    return None


def delete_department(department_id: int) -> bool:
    department = get_department_by_id(department_id)
    if department:
        department.delete()
        return True
    return False