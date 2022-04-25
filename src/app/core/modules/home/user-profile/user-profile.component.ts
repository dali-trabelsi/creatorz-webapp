import { UserModel } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/user/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user!: UserModel;
  isEditing: boolean = false;
  fieldsEditing = {
    dob: {
      isEditing: false,
      isValid: true,
      value: '',
    },
    phone: {
      isEditing: false,
      isValid: true,
      value: '',
    },
    avatar: {
      isEditing: false,
      isValid: true,
      value: '',
      file: '' as string | Blob,
      base64: '' as string | ArrayBuffer | null,
    },
  };

  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.service.getUserInfo().subscribe({
      next: (res: UserModel) => {
        this.user = res;
        this.user.avatar = this.user.avatar
          ? environment.apiUrl + '/media/' + this.user.avatar
          : environment.userAvatarImgPlaceholder;

        this.fieldsEditing.phone.value = this.user.phone;
        this.fieldsEditing.dob.value = this.user.dob
          .toISOString()
          .substring(0, 10);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  update(query: any) {
    this.service.updateUserInfo(query).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editDetails(event: any) {
    switch (event.field) {
      case 'dob':
        switch (event.action) {
          case 'start':
            this.fieldsEditing.dob.isEditing = true;
            break;
          case 'cancel':
            this.fieldsEditing.dob.isEditing = false;
            break;
          case 'submit':
            this.fieldsEditing.dob.isEditing = false;
            this.update({ dob: new Date(this.fieldsEditing.dob.value) });
            this.user.dob = new Date(this.fieldsEditing.dob.value);
            break;
          default:
            break;
        }
        break;
      case 'phone':
        switch (event.action) {
          case 'start':
            this.fieldsEditing.phone.isEditing = true;
            break;
          case 'cancel':
            this.fieldsEditing.phone.isEditing = false;
            break;
          case 'submit':
            this.fieldsEditing.phone.isEditing = false;
            this.update({ phone: this.fieldsEditing.phone.value });
            this.user.phone = this.fieldsEditing.phone.value;
            break;
          default:
            break;
        }
        break;
      case 'avatar':
        switch (event.action) {
          case 'start':
            this.fieldsEditing.avatar.isEditing = true;
            break;
          case 'cancel':
            this.fieldsEditing.avatar.isEditing = false;
            this.fieldsEditing.avatar.base64 = '';
            this.fieldsEditing.avatar.file = '';
            break;
          case 'submit':
            this.fieldsEditing.avatar.isEditing = false;
            const formData = new FormData();
            formData.append('avatar', this.fieldsEditing.avatar.file);
            this.update(formData);
            location.reload();
            break;
          default:
            break;
        }
        break;
    }
  }

  imgPicker(file: File) {
    this.fieldsEditing.avatar.file = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.fieldsEditing.avatar.isEditing = true;
      const base64data = reader.result;
      this.fieldsEditing.avatar.base64 = base64data;
    };
  }
}
