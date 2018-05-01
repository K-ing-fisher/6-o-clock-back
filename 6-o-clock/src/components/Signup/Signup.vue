<template>
  <form>
    <label for="name">이름</label>
    <input type="text" class="input-files" id="name" v-model="name">

    <label for="id">아이디</label>
    <input type="text" class="input-files" id="id" v-model="id">

    <label for="pw">비밀번호</label>
    <input type="password" class="input-files" id="pw" v-model="pw">

    <label for="checkPw">비밀번호 확인</label>
    <input type="password" class="input-files" id="checkPw" v-model="checkPw" ref="checkPw">

    <button type="button" name="submit" @click="submitSignup">회원가입</button>
  </form>
</template>

<script>
import toastr from 'toastr'
import axios from 'axios'
import { VALIDATION_CHECK, errorHandler } from '../../common'

export default {
  name: 'signup',
  data () {
    return {
      name: '',
      id: '',
      pw: '',
      checkPw: ''
    }
  },
  computed: {
    compoundProperty () {
      return [this.pw, this.checkPw];
    }
  },
  watch: {
    compoundProperty (val) {
      let checkPwForm = this.$refs['checkPw'];
      let [pw, checkPw] = val;

      if (pw !== '' && checkPw !== '') {
        checkPwForm.style.border = pw === checkPw ? '1px solid green' : '1px solid red';
      }
    }
  },
  methods: {
    submitSignup () {
      switch (this.validationCheck(this.name, this.id, this.pw, this.checkPw)) {
        case VALIDATION_CHECK.EMPTY_NAME:
          toastr.warning('이름을 입력해주세요.')
          break;
        case VALIDATION_CHECK.EMPTY_ID:
          toastr.warning('아이디를 입력해주세요.')
          break;
        case VALIDATION_CHECK.INVALIDATION_PASSWORD:
          toastr.warning('비밀번호 형식을 확인해주세요.')
          break;
        case VALIDATION_CHECK.DIFFERENT_PASSWORD:
          toastr.warning('비밀번호가 다릅니다. \n 확인해주세요.')
          break;
        case VALIDATION_CHECK.SUCCESS:
          axios.post('/server-uri', {
            id: this.id,
            pw: this.pw,
            name: this.name
          })
          .then( response => {
            if (!response) { return toastr.warning('잠시후 다시 시도해주세요!') }
            setToken(response.data.accessToken);
            toastr.success('회원가입에 성공했습니다!');

            this.$router.push('/success');

            // 원래 상태코드 보고 결정
          })
          .catch( errorHandler );
          break;
        
        default:
          toastr.error('알 수 없는 에러가 발생했습니다.');
          break;
      }
    },

    validationCheck (name, id, pw, checkPw) {
      const PASSWORD_REGEXP = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;

      if (!PASSWORD_REGEXP.test(pw)) {
        return VALIDATION_CHECK.INVALIDATION_PASSWORD;
      } else if (pw !== checkPw) {
        return VALIDATION_CHECK.DIFFERENT_PASSWORD;
      } else if (name === '') {
        return VALIDATION_CHECK.EMPTY_NAME;
      } else if (id === '') {
        return VALIDATION_CHECK.EMPTY_ID;
      }

      return VALIDATION_CHECK.SUCCESS;
    }
  }
}
</script>

<style scoped>
  form {
    width: 400px;
    height: 650px;
    margin: 0 auto;
    border-radius: 7.5px;
    box-shadow: 0 0 3px darkgray;
    position: relative;
    top: 3rem;
  }

  .input-files {
    display: block;
  }

  button {
    margin-top: 1rem;
  }
</style>


