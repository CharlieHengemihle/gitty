const exchangeCodeForToken = async (code) => {
  // eslint-disable-next-line
  console.log(`CALLING MOCK ${code}`);
  return 'MOCK TOKEN FOR CODE';
};

const getGithubProfile = async (token) => {
  // eslint-disable-next-line
  console.log(`CALLING MOCK ${token}`);
  return {
    login: 'fake_github_user',
    avatar_url: 'https://www.placecage.com/gif/300/300',
    email: 'def-real@teengoogle.com',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
