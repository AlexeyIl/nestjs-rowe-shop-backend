import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoLoggedUserDB, NoLoggedUserInterface } from '../interfaces/no-logged-user.interface';
import { CreateNoLoggedUserDto } from '../dto/create-no-logged-user.dto';
import { UserDB, UserInterface } from '../interfaces/user.interface';
import { SecureService } from './secure.service';

@Injectable()
export class UsersDbService {

    constructor(
        @InjectModel('NoLoggedUsers') private readonly noLoggedUserModel: Model<NoLoggedUserDB>,
        @InjectModel('users') private readonly UserModel: Model<UserDB>,
        private secure: SecureService
    ){}

    async getNotLoggedUser(token: string): Promise<NoLoggedUserDB> {
        return this.noLoggedUserModel.findOne({token: token}).exec()
    }

    async addNotLoggedUser(user: CreateNoLoggedUserDto): Promise<NoLoggedUserDB> {
        const createNoLoggedUser = new this.noLoggedUserModel(user);
        return createNoLoggedUser.save()
    }

    async updateNotLoggedUser(user: NoLoggedUserInterface): Promise<NoLoggedUserDB> {
        await this.noLoggedUserModel.updateOne({token: user.token}, {$set: {cart: user.cart}}).exec();
        return this.noLoggedUserModel.findOne({token: user.token}).exec()
    }

    async updateNotLoggedUserFavorites(user: NoLoggedUserInterface): Promise<NoLoggedUserDB> {
        await this.noLoggedUserModel.updateOne({token: user.token}, {$set: {favorites: user.favorites}}).exec()
        return this.noLoggedUserModel.findOne({token: user.token}).exec()
    }

    async findUserByEmail(email: string): Promise<UserDB | undefined> {
        return this.UserModel.findOne({email}).exec()
    }

    async findUserById(id: string): Promise<UserDB | undefined> {
        return this.UserModel.findById(id).exec()
    }
    
    async addUser(user: UserInterface): Promise<UserDB | undefined> {
        if(await this.findUserByEmail(user.email)) {
            return undefined
        } else {
            const createUser = new this.UserModel(user);
            return createUser.save() 
        }
    }

    async updateLoggedUser(id, cart): Promise<UserDB> {
        await this.UserModel.updateOne({_id: id}, {$set: {cart}}).exec()
        return this.UserModel.findById(id).exec()
    }

    async updateLoggedUserFavorites(id: string, favorites: [string]): Promise<UserDB> {
        await this.UserModel.updateOne({_id: id}, {$set: {favorites}}).exec()
        return this.UserModel.findById(id).exec()
    }

    async findByEmailToken(emailToken: string): Promise<UserDB> {
        return this.UserModel.findOne({'emailToken.token': emailToken}).exec()
    }

    async verifyEmail(emailToken: string): Promise<UserDB> {
        return await this.UserModel.findOneAndUpdate({'emailToken.token': emailToken},{ $set: {emailVerified: true}}).exec()
    }

    async findUserByPassRecToken(token: string) {
        return this.UserModel.findOne({'passwordRecovery.token': token}).exec()
    }

    async setPasswordRecoveryToken(user: UserInterface): Promise<UserDB> {
        return this.UserModel.findOneAndUpdate({email: user.email}, {$set : {passwordRecovery: user.passwordRecovery}}).exec()
    }

    async setNewPasswordByRecoveryToken(password: string, token: string): Promise<UserDB> {
        return this.UserModel.findOneAndUpdate({'passwordRecovery.token': token}, { $set: {password, passwordRecovery: undefined}}).exec()
    }

    async updateUser(userId, newUser: UserDB): Promise<UserDB> {
        await this.UserModel.findByIdAndUpdate(userId, {$set : {email: newUser.email, name: newUser.name, phone: newUser.phone, adress: newUser.adress, password: newUser.password}}).exec()
        return this.UserModel.findById(userId).exec();
    }
}