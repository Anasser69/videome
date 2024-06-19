import { ID,Account,Client, Avatars, Databases, Query } from "react-native-appwrite";
import SignIn from "../app/(auth)/sign-in";


export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.madara.aora",
  projectid: "6671b6380024c70c7770",
  databaseid: "6671b8410030e22f0605",
  userCollectionid: "6671b868001a6ddcf400",
  videoCollectionid: "6671b89e000d501d9f40",
  storgeid: "6671ba3300055e3dec4f",
};


// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) 
  .setProject(config.projectid) 
  .setPlatform(config.platform); 


  const account = new Account(client);
  const avatars = new Avatars(client);
  const databases=new Databases(client)

 export const createUser =async (email,password,username) =>{
 try {
    const newAccount=await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if(!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)


    await signIn(email,password)

    const newUser=await databases.createDocument(
      config.databaseid,
      config.userCollectionid,
      ID.unique(),
      {
        accountid:newAccount.$id,
        email,
        username,
        avatar:avatarUrl
      }
    )
 } catch (error) {
  console.log(error)
  throw new Error(error)
 }
  }
  
export async function signIn(email,password){
  try {
    const session =await account.createEmailPasswordSession(email,password)
    return session
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () =>{
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseid,
      config.userCollectionid,
      [Query.equal('accountid',currentAccount.$id)]
    )

    if(!currentUser) throw Error

    return currentUser.documents[0];
  } catch (error) {
    console.log(error)
  }
}