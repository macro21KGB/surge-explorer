var process = require('child_process');


const getSurgeUsername = async () => {

    const usernameQuery = `surge whoami`;
    const username = await new Promise((resolve, reject) => {
        process.exec(usernameQuery, (error, stdout, _) => {
            if (error) {
                reject(error);
            }
            resolve(stdout);
        })
    });

    return deleteTerminalCharactersFromName(username);
}

const checkIfSurgeIsInstalled = async () => {
    const isInstalled = await new Promise((resolve, reject) => {
        process.exec(`npm list -g`, (error, stdout, _) => {
            if (error) {
                reject(error);
            }
            resolve(stdout);
        })
    });

    return isInstalled.includes('surge') ? true : false;
}

const deleteTerminalCharactersFromName = (email) => {
    const name = email.split("@")[0];
    const regex = /\[4m(.*)/gi;
    const match = name.match(regex);
    return match ? match[0].replace("[4m", "") : null;

}

const executeGetSurgeProjects = async () => {

    const surgeOutput = await new Promise((resolve, reject) => {
        process.exec('surge list', (error, stdout, _) => {
            if (error) {
                reject(error);
            }
            resolve(stdout);
        });
    });

    return surgeOutput;
}


const getSurgeProjects = async () => {
    // Get the list of projects from surge

    const surgeOutput = await executeGetSurgeProjects();
    const projects = surgeOutput.split('\n');
    const regex = /([\w\-]+\.surge.sh)/gi;

    const projectNames = projects.map(project => {
        const match = project.match(regex);
        return match ? match[0].replace("39m", "") : null;
    }).filter(project => project !== null);

    return projectNames;
}


const teardownSite = async (name) => {
    // Get the list of projects from surge
    const surgeOutput = await new Promise((resolve, reject) => {
        process.exec(`surge teardown ${name}`, (error, stdout, _) => {
            if (error) {
                reject(error);
                return false;
            }
            resolve(stdout);
        });
    });

    return true;
}

module.exports = {
    getSurgeUsername,
    checkIfSurgeIsInstalled,
    getSurgeProjects
}