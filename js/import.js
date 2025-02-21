

async function importlijsten(waar) {
    let temp = document.getElementById(waar).value;
    // Split the string into lines (each line is an array element)
    const lines = temp.split('\n').filter(line => line.trim() !== ''); // Remove empty lines

    // Split into two arrays: even-indexed lines and odd-indexed lines
    const array1 = lines.filter((_, index) => index % 2 === 0); // Even indices (0, 2, 4...)
    const array2 = lines.filter((_, index) => index % 2 !== 0); // Odd indices (1, 3, 5...)
    vragen = [...array1]
    antwoorden = [...array2]
    antwoord_oud = [...antwoorden];
    vragen_oud = [...vragen];

    let id = await upload_lijst();
    console.log(id)
    new Notify({
        title: 'je code!',
        text: 'je lijst is geüpload met id: ' + id + '. sluit dit venster om verder te gaan.',
        autoclose: false,
        effect: 'slide',
        speed: 300,
        position: 'center',
    });

    goTo('kies_wat_wil_doen.html');
}
function importlijsten_fromstr(input1) {
    let temp = input1;
    // Split the string into lines (each line is an array element)
    const lines = temp.split('\n').filter(line => line.trim() !== ''); // Remove empty lines

    // Split into two arrays: even-indexed lines and odd-indexed lines
    const array1 = lines.filter((_, index) => index % 2 === 0); // Even indices (0, 2, 4...)
    const array2 = lines.filter((_, index) => index % 2 !== 0); // Odd indices (1, 3, 5...)
    vragen = [...array1]
    antwoorden = [...array2]
    antwoord_oud = [...antwoorden];
    vragen_oud = [...vragen];

    goTo('kies_wat_wil_doen.html');


}