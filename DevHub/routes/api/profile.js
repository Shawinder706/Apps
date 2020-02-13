const Express = require('express');
const router = Express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth')
const Profile = require('../../models/profile')
const User = require('../../models/profile')


const { check, validationResult } = require('express-validator')

// @route    api/profile/me
// @request  GET
// @desc  Get current user profile
// @access   private
router.get(
    '/me',
    auth,
    async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.id }).populate('user'['name', 'avatar']);
            if (!profile) {
                return res.status(400).json({ msg: 'There is no profile for this user' })
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Sever Error');
        }
    });

// @route    api/profile/me
// @request  POST
// @desc  create or update user profile
// @access   private

router.post(
    '/',
    [
        auth,
        [
            check('status', 'status is required')
                .not()
                .isEmpty(),
            check('skills', 'Skills is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        //Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        // build social object
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id })

            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    {
                        user: req.user.id
                    },
                    {
                        $set: profileFields
                    },
                    {
                        new: true
                    }
                );
                return res.json({ profile });
            }

            // create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile)

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }


    }
)

// @route    api/profile/me
// @request  GET
// @desc     Get all profiles
// @access   public
router.get(
    '/',
    async (req, res) => {
        try {
            const profiles = await Profile.find().populate('user', ['name', 'avatar']);
            res.json(profiles)
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');

        }
    }

)

// @route    api/profile/userid
// @request  GET
// @desc     Get profile by user id
// @access   public

router.get(
    '/user/:user_id',
    async (req, res) => {
        try {
            const profile = await Profile.findOne(
                {
                    user: req.params.user_id
                }
            ).populate(
                'user', ['name', 'avatar']
            );
            if (!profile) {
                return res.status(400).json({ msg: 'There is no profile for this user' })
            }
            res.json(profile)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }
)

// @route    Delete api/profile
// @request  DELETE
// @desc     Delete user profiles and posts
// @access   private

router.delete(
    '/',
    auth,
    async (req, res) => {
        try {
            //remove prfile 
            await Profile.findOneAndRemove({ user: req.user.id })
            //remove user
            await User.findOneAndRemove({ _id: req.user.id })
            res.json({ msg: 'User Removed' })
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');

        }
    }
)

// @route     api/profile/experince
// @request  PUT
// @desc     Add profile experience
// @access   private

router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'Title is required').not().isEmpty()
        ]

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp)
            await profile.save()
            res.json(profile)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

// @route    Delete api/profile/experience/exp:id
// @request  DELETE
// @desc     Delete user experience
// @access   private

router.delete(
    '/experience/:exp_id',
    auth,
    async (req, res) => {
        try {

            const profile = await Profile.findOne({ user: req.user.id });

            //get romeve index
            const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)
            profile.experience.splice(removeIndex, 1);
            await profile.save();
            res.json(profile);

        } catch (err) {
            console.log(err.message);
        }
    }
)
// @route    api/profile/education
// @request  PUT
// @desc     add user education
// @access   private
router.put(
    '/education',
    [
        auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldofstudy', 'Field is required').not().isEmpty(),
            check('from', 'From is required').not().isEmpty()
        ]
    ],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }
        const {
            school,
            degree,
            from,
            fieldofstudy,
            to,
            current,
            description
        } = req.body;

        const newEducation = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.education.unshift(newEducation);
            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

// @route    Delete api/profile/education/:edu_id
// @request  DELETE
// @desc     delete user education
// @access   private

router.delete(
    '/education/:edu_id',
    auth,
    async (req, res) => {
        try {

            const profile = await Profile.findOne({ user: req.user.id });
            const removeIndex = await profile.education.map(item => item.id).indexOf(req.params.edu_id);
            profile.education.splice(removeIndex, 1);
            profile.save();
            res.json(profile);

        } catch (err) {

        }
    }
);

// @route    api/profile/github/:username
// @request  GET
// @desc     Get users repos from github
// @access   Public
router.get('/github/:username', (req, res) => {
    try {
        const option = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&clientid=${config.get('gihubClientId')}&client_secret=${config.get('githubSecretKey')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };
        request(option, (error, response, body) => {
            if (error) console.error(error);

            if (response.statusCode !== 200) {
                res.status(404).json({ msg: "No Github profile found" });
            }
            //res.json(JSON.parse(body));
            res.send(body)
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }
}
)
module.exports = router;