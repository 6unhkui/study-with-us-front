
export const validateMessages = () => {
    const { useTranslation } = require('react-i18next');

    console.log(useTranslation.language)
    return {
        required: useTranslation.t('validate.required', { name: '${label}'})
    }
}


export const PasswordRegex = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");