import Account from "../../models/accounts.js";
async function updateAccount(_, args) {
    const accountDetails = await Account.findById(args.id);
    if (args.edits.firstname)
        accountDetails.firstname = args.edits.firstname;
    if (args.edits.lastname)
        accountDetails.lastname = args.edits.lastname;
    if (args.edits.profile_picture)
        accountDetails.profile_picture = args.edits.profile_picture;
    if (args.edits.banner_picture)
        accountDetails.banner_picture = args.edits.banner_picture;
    if (args.edits.bookmarked_articles_id)
        accountDetails.bookmarked_articles_id = args.edits.bookmarked_articles_id;
    if (args.edits.bio)
        accountDetails.bio = args.edits.bio;
    try {
        const response = await accountDetails.save();
        return response;
    }
    catch (err) {
        throw new Error(err);
    }
}
export default updateAccount;
