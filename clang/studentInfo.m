#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#define MAX 50

typedef struct student
{
    char Name[10];
    int Age;
    int Class;
    int Number;
    char Gender[10];
}Student;

void ShowStudent(Student* St)
{
    printf("==============%s(%d)=============\n", St->Name, St->Number);
    printf("Age : %d, Gender : %s,  Grade : %d\n", St->Age, St->Gender, St->Class);
}
void SetStudent(Student* St, int* StudentCount,Student* StudentList[])
{
    char Name[256];
    printf("======%d Student======\n", (*StudentCount) + 1);
    printf("Enter Name : ");
    scanf("%s", Name);
    for (int i = 0; i < (*StudentCount) ; i++)
    {
        if (strcmp(Name, StudentList[i]->Name) == 0)
        {
            printf("This name is already registered\n");
            free(St);
            return;
        }
    }
    int i;
    for (i = 0; Name[i] != NULL; i++)
    {
        St->Name[i] = Name[i];
    }
    St->Name[i] = NULL; //code to copy string
    printf("Age : ");
    scanf("%d", &St->Age);
    printf("Gender : ");
    scanf("%s", St->Gender);
    printf("Grade : ");
    scanf("%d", &St->Class);
    St->Number = ++(*StudentCount);
}

void ShowClass(Student* Student_List[], int Size, int Class)
{
    printf("==============(%dth)grade==============\n", Class);
    for (int i = 0; i < Size; i++)
    {
        if (Student_List[i]->Class == Class)
            ShowStudent(Student_List[i]);
    }
    printf("===================================\n");
}

void FindName(Student* Student_List[], int Size, char Name[])
{
    for (int i = 0; i < Size; i++)
    {
        if (strcmp(Student_List[i]->Name, Name) == 0)
            ShowStudent(Student_List[i]);
    }
}

void StudentListClear(Student* Student_List[], int* Size)
{
    for (int i = 0; i < *Size; i++)
    {
        printf("%sComplete student dynamic de-allocation\n", Student_List[i]->Name);
        free(Student_List[i]);
        Student_List[i] = NULL;
    }
    *Size = 0;
}

int LoadStudentCount()
{
    FILE* f = fopen("StudentListInfo.txt", "r");
    char buf[256];
    int Count = 0;
    while (!feof(f))
    {
        Count++;
        fgets(buf, sizeof(buf), f);
    }
    fclose(f);
    return Count;
}

void SaveStudentList(Student* Student_List[], int Size)
{
    int Count = LoadStudentCount();//Number of students currently saved in notepad

    FILE* f = fopen("StudentListInfo.txt", "r");
    int* IndexList; //Save the index number of students who should not be saved
    int CurIndex = 0; //Number of students who should not be saved
    IndexList = (int*)malloc(sizeof(int) * Size);
    //Declare an int array as many as the number of students currently stored
    if (f != NULL) //Code that finds duplicate names by the fact that if the file exists, there is information in it
    {
        while (!feof(f)) //read the whole file
        {
            char Name[256]; //Temporary variable to store name
            fscanf(f, "%s", Name); //bring name
            for (int i = 0; i < Size; i++)//Repeat students to save current
            {
                //Check if there is a student with the same name as the student in the file
                //Code to check == strcmp -> String comparison function 0 is the same
                if (strcmp(Name, Student_List[i]->Name) == 0)
                {
                    IndexList[CurIndex] = i;//save the index
                    CurIndex++;//increase in number
                    break;
                }
            }
            int tmp1, tmp2;
            char buf[256];//Save the remaining age, grade, gender, and then blow it away so that you can bring the next name
            fscanf(f, "%d%d%s", &tmp1, &tmp2, buf);
        }
        fclose(f);
    }
    f = fopen("StudentListInfo.txt", "a");
    for (int i = 0; i < Size; i++)
    {
        int Flag = 0;
        for (int j = 0; j < CurIndex; j++)
        {
            if (i == IndexList[j])
            {
                Flag = 1;
                break;
            }
        }
        if (Flag == 1)
            continue;
        if (Count != 0)
            fprintf(f, "\n");
        fprintf(f, "%s %d %d %s", Student_List[i]->Name, Student_List[i]->Age,
            Student_List[i]->Class, Student_List[i]->Gender);
        if (Count == 0 && i != Size-1)
            fprintf(f, "\n");
    }
    fclose(f);
 }

void LoadStudent(Student* StudentList[], int* Size)
{
    FILE* f = fopen("StudentListInfo.txt", "r");
    if (f == NULL)
    {
        printf("There are no saved students.\n");
        return;
    }
    StudentListClear(StudentList, Size);
    while (!feof(f))
    {
        StudentList[*Size] = (Student*)malloc(sizeof(Student));
        fscanf(f, "%s%d%d%s", StudentList[*Size]->Name, &StudentList[*Size]->Age,
            &StudentList[*Size]->Class, StudentList[*Size]->Gender);
        StudentList[*Size]->Number = (*Size)+1;
        (*Size)++;
    }
    fclose(f);
}

void main()
{
    Student* Student_List[MAX];
    int Select;
    int StudentCount = 0;
    int Name[256] = { 0 };

    while (1)
    {
        printf("====Student information Management Program====(total number of people : %d)\n", StudentCount);
        printf("1.student enrollment\n");
        printf("2.Student List (Registration order)\n");
        printf("3.Student List (by grade)\n");
        printf("4.Student Search (Name)\n");
        printf("5.Student Search (Grade)\n");
        printf("6.Delete last student\n");
        printf("7.Delete all information\n");
        printf("8.Save\n");
        printf("9.Loading\n");
        printf("10.End Program\n");
        printf("Input : ");
        scanf("%d", &Select);
        switch (Select)
        {
        case 1:
            if (StudentCount + 1 >= MAX)
            {
                printf("The student capacity (50 students) is full.\n");
                system("pause");
                break;
            }
            Student_List[StudentCount] = (Student*)malloc(sizeof(Student));
            SetStudent(Student_List[StudentCount], &StudentCount,Student_List);
            break;
        case 2:
            for (int i = 0; i < StudentCount; i++)
                ShowStudent(Student_List[i]);
            break;
        case 3:
            for (int i = 9; i <= 12; i++)
                ShowClass(Student_List, StudentCount, i);
            break;
        case 4:
            printf("Enter student name to search : ");
            scanf("%s", Name);
            FindName(Student_List, StudentCount, Name);
            break;
        case 5:
            printf("Please enter a grade to search : ");
            scanf("%d", &Select);
            ShowClass(Student_List, StudentCount, Select);
            break;
        case 6:
            if (StudentCount == 0)
            {
                printf("No more students to delete.\n");
                break;
            }
            StudentCount--;
            free(Student_List[StudentCount]);
            Student_List[StudentCount] = NULL;
            break;
        case 7:
            StudentListClear(Student_List, &StudentCount);
            break;
        case 8:
            SaveStudentList(Student_List, StudentCount);
            break;
        case 9:
            LoadStudent(Student_List, &StudentCount);
            break;
        case 10:
            StudentListClear(Student_List, &StudentCount);
            return;
        }
        system("pause");
    }
}
