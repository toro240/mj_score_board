class Student():
    SEX_MAN = 0
    SEX_WOMAN = 1

    def __init__(self, name, sex):
        self.__name = name
        self.__sex = sex

    def get_name(self):
        return self.__name

    def get_sex(self):
        return self.__sex

    def get_sex_name(self):
        sex = self.get_sex()
        if sex == self.SEX_MAN:
            return '♂'
        elif sex == self.SEX_WOMAN:
            return '♀'
        else:
            return '???'
