export const validatorForUser = ({
    user_name: { notEmpty: true },
    password: { notEmpty: true },
    type: { notEmpty: true },
    name: { notEmpty: true }
});

export const validatorSign = ({
    user_name: { notEmpty: true },
    password: { notEmpty: true }
})

