import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contributor')
export class Contributor {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    firstname!: string;

    @Column('text')
    lastname!: string;

    //   @ManyToMany(type => Category, {
    // 		cascade: ['insert']
    // 	})
    // 	@JoinTable()
    // 	categories!: Category[];


    // 	@ManyToOne(type => Author, author => author.posts, {
    // 		cascade: ['insert']
    // 	})
    // 	author!: Author;

}
