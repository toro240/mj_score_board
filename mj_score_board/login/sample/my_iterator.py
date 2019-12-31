class MyIterator():
    def __init__(self):
        self.__i = 0
        self._list = []
    def __iter__(self):
        # __next__()はselfが実装してるのでそのままselfを返す
        return self
    def __next__(self):
        if self.__i == len(self._list):
            raise StopIteration()
        value = self._list[self.__i]
        self.__i += 1
        return value

    def append(self, element):
        self._list.append(element)
