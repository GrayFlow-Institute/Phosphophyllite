function t(x) {
    return new Promise((yes, err) => {
        yes('fus:' + x);
    });
}

async function t2() {
    let x = await t('x');
    console.log(x);
}

t2();
