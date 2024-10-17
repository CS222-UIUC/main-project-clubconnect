import { isValidEmail, isValidPassword, containsBadWord } from "./sanitation";

test("isValidEmail works as expected", () => {
    //check valid email addresses
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("user.name+tag@domain.co")).toBe(true);
  
    //check invalid email addesses
    expect(isValidEmail("test@.com")).toBe(false);
    expect(isValidEmail("user@domain")).toBe(false);
    expect(isValidEmail("user@domain..com")).toBe(false);
    expect(isValidEmail("userdomain.com")).toBe(false);
  });


  test("isValidPassword works as expected", () => {
    expect(isValidPassword("StrongPass123!")).toBe(true);
    expect(isValidPassword("Another#Pass!2")).toBe(true);


    expect(isValidPassword("weak")).toBe(false);  
    expect(isValidPassword("onlylowercaseletters")).toBe(false); 
    expect(isValidPassword("123456789")).toBe(false);  
  });

  
  test("containsBadWord works as expected", () => {
    expect(containsBadWord("This is a clean sentence.")).toBe(false);
  
    expect(containsBadWord("This sentence contains damn!")).toBe(true);
  });
  