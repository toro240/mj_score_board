from .model import Student
from .my_iterator import MyIterator

class StudentList(MyIterator):
    SORT_TYPE_NAME_ASC = 1
    SORT_TYPE_NAME_DESC = 2

    def sort(self, sort_type):
        if not(sort_type in {self.SORT_TYPE_NAME_ASC, self.SORT_TYPE_NAME_DESC}):
            return

        if sort_type in {self.SORT_TYPE_NAME_ASC, self.SORT_TYPE_NAME_DESC}:
            self.__name_sort(sort_type)

    def __name_sort(self, sort_type):
        if not(sort_type == self.SORT_TYPE_NAME_ASC or sort_type == self.SORT_TYPE_NAME_DESC):
            return

        self._list = sorted(self._list, key=lambda li: li.get_name())
        if sort_type == self.SORT_TYPE_NAME_DESC:
            self._list.reverse()
