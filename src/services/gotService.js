export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
        // нижнее подчеркивание ствится для того чтобы сказать 
        // другим разработчикам что это статические данные
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`); // фетчим url
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json(); // json() делаем его в JSON-объект
    }

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter)
    }

    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}/`);
        return this._transformCharacter(character)
    }

    getAllHouses() {
        return this.getResource(`/houses/`);
    }

    getHouse(id) {
        return this.getResource(`/houses/${id}/`);
    }

    getAllBooks() {
        return this.getResource(`/books/`);
    }

    getBook(id) {
        return this.getResource(`/books/${id}/`);
    }

    _transformCharacter(char) {
        return {
            name: 
                char.name,
                gender: char.gender,
                born: char.born,
                died: char.died,
                culture: char.culture
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            gender: house.region,
            born: house.words,
            died: house.titels,
            culture: house.overload,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.renumberOfPagesgion,
            publisher: book.publisher,
            released: book.released
        }
    }
}
