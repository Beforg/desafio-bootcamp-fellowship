import Book from "../entities/Book.ts";
import Loan from "../entities/Loan.ts";
import User from "../entities/User.ts";
import type IBookRepository from "../repositories/interfaces/IBookRepository.ts";
import type ILoanRepository from "../repositories/interfaces/ILoanRepository.ts";
import type IUserRepository from "../repositories/interfaces/IUserRepository.ts";
import { FilterType } from "../enum/Filter.ts";
import type SearchStrategy from "../strategies/SearchStrategy.ts";
import SearchByTitle from "../strategies/SearchByTitle.ts";
import SearchByAuthor from "../strategies/SearchByAuthor.ts";
import SearchByCategory from "../strategies/SearchByCategory.ts";

export default class LibraryService {
    constructor(
        private bookRepository: IBookRepository, 
        private userRepository: IUserRepository, 
        private loanRepository: ILoanRepository) {}

    registerBook(books: Book[]): Book[] | null{
        try {
            for (const book of books) {
                this.bookRepository.save(book);
            }
            console.log("Books registered successfully.");
            return books;
        } catch (error) {
            console.log("Error while registering book:", (error as Error).message);
            return null;
        }
        
    }
    registerUser(users: User[]): User[] | null {
        try {
            for (const user of users) {
                this.userRepository.save(user);
            }
            console.log("Users registered successfully.");
            return users;
        } catch (error) {
            console.error("Error while registering user:", (error as Error).message);
            return null;
        }
    }

    loanBook(userId: number, bookId: number): Loan | null{
        try {
            const bookToLoan = this.bookRepository.findById(bookId);
            const user = this.userRepository.findById(userId);
            
            bookToLoan!.descrease();
            console.log(`Book ${bookToLoan!.title} loaned to user ${user!.name} successfully.`);
            return this.loanRepository.save(new Loan(user!.id, bookToLoan!.id));
        }
        catch (error) {
            console.error("Error while loaning book:", (error as Error).message );
            return null
        }

    }
    givenBackBook(userId: number, bookIde: number): Book | null {
        try {
            const user = this.userRepository.findById(userId);
            const book = this.bookRepository.findById(bookIde);
            const loan = this.loanRepository.remove(user!, book!); 
            book!.increase();
            console.log(`Removed loan ${loan?.id} - Book ${book!.title} returned successfully.`);
            return book!;
        } catch (error) {
            console.error("Error while returning book:", (error as Error).message);
            return null;
        }
    }

    givenBackBookByLoanId(loanId: number): Book | null {
        try {
            const loan = this.loanRepository.findById(loanId);
            const book = this.bookRepository.findById(loan!.bookId);
            
            book!.increase();
            this.loanRepository.removeById(loan!.id);
            console.log(`Removed loan ${loanId} - Book ${book!.title} returned successfully.`);
            return book!;
        } catch (error) {
            console.error("Error while returning book by loan ID:", (error as Error).message);
            return null;
        }

    }

    searchBook(term: string, filter: FilterType): Book[] | null {
        let searchStrategy: SearchStrategy<Book> | null;
        try {
            searchStrategy = this.getSearchStrategy(filter);
            console.log(`Searching for books with term: ${term} and filter: ${filter}`);
            return this.bookRepository.search(searchStrategy, term);
        } catch (error) {
            console.error("Error while searching book:", (error as Error).message);
            return null;
        }
    }

    private getSearchStrategy(filter: FilterType): SearchStrategy<Book> {
        switch (filter) {
            case FilterType.AUTHOR:
                return new SearchByAuthor();
            case FilterType.TITLE:
                return new SearchByTitle();
            case FilterType.CATEGORY:
                return new SearchByCategory();
            default:
                throw new Error("Invalid search filter.");
        }
    }
        
}